import { usePosts } from './usePosts';

export function PostFeed({ userId }: { userId: string }) {
  const { posts, loading, unreadCount, markAsRead } = usePosts(userId);

  return (
    <div className="feed-panel">
      <div className="feed-header">
        <div className="feed-header-left">
          <span className="feed-title">Feed</span>
          {unreadCount > 0 && <span className="badge">{unreadCount} unread</span>}
        </div>
        <span className="feed-count">{posts.length} posts</span>
      </div>

      {loading ? (
        <div className="feed-empty">Loading...</div>
      ) : posts.length === 0 ? (
        <div className="feed-empty">No posts</div>
      ) : (
        <ul className="post-list">
          {posts.map((post) => (
            <li
              key={post.id}
              className={post.read ? 'post-row read' : 'post-row unread'}
              onClick={() => markAsRead(post.id)}
            >
              <div className="post-dot" />
              <div className="post-content">
                <div className="post-title-text">{post.title}</div>
                <div className="post-body-preview">{post.body.slice(0, 80)}...</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
