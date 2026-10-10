export interface LikeData {
  postId: string;
  count: number;
  isLiked: boolean;
}

export class LikeManager {
  private static LIKED_POSTS_KEY = 'likedPosts';
  private static LIKE_COUNTS_KEY = 'likeCounts';

  // Get like count for a post
  static getLikeCount(postId: string): number {
    try {
      const likeCounts = JSON.parse(localStorage.getItem(this.LIKE_COUNTS_KEY) || '{}');
      return likeCounts[postId] || 0;
    } catch (error) {
      console.error('Error getting like count:', error);
      return 0;
    }
  }

  // Check if user has liked a post
  static isPostLiked(postId: string): boolean {
    try {
      const likedPosts = JSON.parse(localStorage.getItem(this.LIKED_POSTS_KEY) || '[]');
      return likedPosts.includes(postId);
    } catch (error) {
      console.error('Error checking if post is liked:', error);
      return false;
    }
  }

  // Like a post
  static likePost(postId: string): number {
    try {
      const likedPosts = JSON.parse(localStorage.getItem(this.LIKED_POSTS_KEY) || '[]');
      const likeCounts = JSON.parse(localStorage.getItem(this.LIKE_COUNTS_KEY) || '{}');
      
      // Add to liked posts if not already liked
      if (!likedPosts.includes(postId)) {
        likedPosts.push(postId);
        likeCounts[postId] = (likeCounts[postId] || 0) + 1;
      }
      
      // Save to localStorage
      localStorage.setItem(this.LIKED_POSTS_KEY, JSON.stringify(likedPosts));
      localStorage.setItem(this.LIKE_COUNTS_KEY, JSON.stringify(likeCounts));
      
      return likeCounts[postId];
    } catch (error) {
      console.error('Error liking post:', error);
      return 0;
    }
  }

  // Unlike a post
  static unlikePost(postId: string): number {
    try {
      const likedPosts = JSON.parse(localStorage.getItem(this.LIKED_POSTS_KEY) || '[]');
      const likeCounts = JSON.parse(localStorage.getItem(this.LIKE_COUNTS_KEY) || '{}');
      
      // Remove from liked posts
      const index = likedPosts.indexOf(postId);
      if (index > -1) {
        likedPosts.splice(index, 1);
      }
      
      // Decrease count (minimum 0)
      likeCounts[postId] = Math.max((likeCounts[postId] || 0) - 1, 0);
      
      // Save to localStorage
      localStorage.setItem(this.LIKED_POSTS_KEY, JSON.stringify(likedPosts));
      localStorage.setItem(this.LIKE_COUNTS_KEY, JSON.stringify(likeCounts));
      
      return likeCounts[postId];
    } catch (error) {
      console.error('Error unliking post:', error);
      return 0;
    }
  }

  // Toggle like status
  static toggleLike(postId: string): { count: number; isLiked: boolean } {
    const isCurrentlyLiked = this.isPostLiked(postId);
    
    if (isCurrentlyLiked) {
      const newCount = this.unlikePost(postId);
      return { count: newCount, isLiked: false };
    } else {
      const newCount = this.likePost(postId);
      return { count: newCount, isLiked: true };
    }
  }

  // Get all like data for a post
  static getLikeData(postId: string): LikeData {
    return {
      postId,
      count: this.getLikeCount(postId),
      isLiked: this.isPostLiked(postId)
    };
  }

  // Get all liked posts
  static getLikedPosts(): string[] {
    try {
      return JSON.parse(localStorage.getItem(this.LIKED_POSTS_KEY) || '[]');
    } catch (error) {
      console.error('Error getting liked posts:', error);
      return [];
    }
  }

  // Get all like counts
  static getAllLikeCounts(): Record<string, number> {
    try {
      return JSON.parse(localStorage.getItem(this.LIKE_COUNTS_KEY) || '{}');
    } catch (error) {
      console.error('Error getting all like counts:', error);
      return {};
    }
  }

  // Clear all like data (for testing or reset)
  static clearAllLikeData(): void {
    localStorage.removeItem(this.LIKED_POSTS_KEY);
    localStorage.removeItem(this.LIKE_COUNTS_KEY);
  }
} 
