// src/components/ApiExplorer.jsx
import React, { useEffect, useState, useRef, useCallback } from "react";
import ApiItem from "../components/ApiItem";
import useDebounce from "../hooks/UseDebounce";

/**
 * ApiExplorer
 *
 * Features implemented (Task 4):
 * - Fetch data from public API (JSONPlaceholder). ✅
 * - Display results in grid layout. ✅
 * - Loading and error states. ✅
 * - Pagination (page-based) + "Load more" and optional infinite scroll. ✅
 * - Search feature (debounced) that filters results (server-side paging used; we filter client-side after fetch as JSONPlaceholder doesn't support q param reliably). ✅
 *
 * Drop this component on a page (e.g., /explorer)
 */

const API_URL = "https://jsonplaceholder.typicode.com/posts";
const DEFAULT_LIMIT = 10; // items per page

export default function ApiExplorer() {
  // --- UI state
  const [items, setItems] = useState([]); // accumulated loaded items
  const [page, setPage] = useState(1);    // current page number (1-based)
  const [limit] = useState(DEFAULT_LIMIT);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true); // whether more pages likely exist

  // Search state + debounced value
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 350); // avoid frequent network work

  // Infinite scroll toggle (you can switch to "Load more" mode)
  const [infinite, setInfinite] = useState(true);

  // Keep ref to the "load more" sentinel element
  const observerRef = useRef(null);

  // AbortController ref to cancel inflight fetches when params change
  const abortRef = useRef(null);

  // --- Fetch function (wrapped in useCallback to avoid recreating)
  const fetchPage = useCallback(async (pageNum, replace = false) => {
    setLoading(true);
    setError(null);

    // cancel previous request if any
    if (abortRef.current) {
      abortRef.current.abort();
    }
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      // JSONPlaceholder supports _page and _limit for pagination.
      const url = new URL(API_URL);
      url.searchParams.set("_page", pageNum);
      url.searchParams.set("_limit", limit);

      // fetch the page
      const res = await fetch(url.toString(), { signal: controller.signal });

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const data = await res.json();

      // If the API returned fewer items than `limit`, we've reached the end
      setHasMore(data.length === limit);

      setItems((prev) => (replace ? data : [...prev, ...data]));

      setLoading(false);
    } catch (err) {
      if (err.name === "AbortError") {
        // request was canceled; do nothing
        return;
      }
      setError(err.message || "Unknown error");
      setLoading(false);
    }
  }, [limit]);

  // --- Initial load & react to page changes or debouncedQuery changes
  // Note: We keep accumulating pages into `items`. If search changes, we reset list and start from page 1.
  useEffect(() => {
    // when the debounced query changes we reset paging and items, then fetch fresh
    setItems([]);        // clear accumulated items
    setPage(1);          // reset page
    setHasMore(true);
    fetchPage(1, true);  // replace = true to avoid merging stale data
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery, fetchPage]); // fetchPage is stable thanks to useCallback

  // --- Load more when page increments (except when debouncedQuery just triggered the reset)
  useEffect(() => {
    if (page === 1) return; // page 1 already loaded above when query changed
    fetchPage(page);
  }, [page, fetchPage]);

  // --- Intersection Observer for infinite scroll
  useEffect(() => {
    if (!infinite) return; // only activate when infinite scroll mode is on
    const el = observerRef.current;
    if (!el) return;

    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading && hasMore) {
        // when sentinel becomes visible, load next page
        setPage((p) => p + 1);
      }
    }, { rootMargin: "200px" });

    io.observe(el);
    return () => io.disconnect();
  }, [infinite, loading, hasMore]);

  // --- Search: client-side filter applied to currently loaded items
  const filtered = items.filter((it) => {
    if (!debouncedQuery) return true;
    const q = debouncedQuery.toLowerCase();
    return it.title.toLowerCase().includes(q) || it.body.toLowerCase().includes(q);
  });

  // --- Handlers
  const handleLoadMore = () => setPage((p) => p + 1);

  const handleToggleInfinite = () => setInfinite((s) => !s);

  const handleRefresh = () => {
    // manual refresh: clear and refetch page 1
    setItems([]);
    setPage(1);
    fetchPage(1, true);
  };

  return (
    <div className="space-y-4">
      {/* Header + controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex items-center gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search title or body..."
            className="px-3 py-2 border rounded w-64"
            aria-label="Search posts"
          />

          <button onClick={handleRefresh} className="px-3 py-2 border rounded text-sm">Refresh</button>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm">Infinite scroll</label>
          <input type="checkbox" checked={infinite} onChange={handleToggleInfinite} aria-label="Toggle infinite scroll" />
        </div>
      </div>

      {/* Grid of items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((it) => (
          <ApiItem key={it.id} item={it} />
        ))}
      </div>

      {/* Loading / Error states */}
      <div className="flex items-center justify-center">
        {loading && <div className="text-sm text-gray-600">Loading...</div>}
        {error && <div className="text-sm text-red-600">Error: {error}</div>}
      </div>

      {/* Pagination / infinite sentinel */}
      <div className="flex items-center justify-center mt-4">
        {/* If infinite mode is off, show Load more (pagination) */}
        {!infinite && hasMore && (
          <button className="px-4 py-2 border rounded" onClick={handleLoadMore} disabled={loading}>
            {loading ? "Loading..." : "Load more"}
          </button>
        )}

        {/* If no more items */}
        {!hasMore && <div className="text-sm text-gray-500">No more items.</div>}
      </div>

      {/* Sentinel element observed by IntersectionObserver for infinite scrolling */}
      <div ref={observerRef} style={{ minHeight: 1 }} />

      {/* small debug / status */}
      <div className="text-xs text-gray-500">
        Showing {filtered.length} of {items.length} fetched items (page {page}). Query: "{debouncedQuery}"
      </div>
    </div>
  );
}
