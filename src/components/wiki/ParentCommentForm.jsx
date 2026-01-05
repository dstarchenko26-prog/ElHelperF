import { useState } from "react";
import { useTranslation } from "react-i18next";

import { getErrorKey } from "@/api/errorHandler";
import { commentService } from "@/api/comment";

import { TextArea, Button } from '@/components/ui';

const ParentCommentForm = ({ articleId, onRefresh }) => {
  const { t } = useTranslation();

  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    if (!newComment.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await commentService.postComment({ 
        articleId, 
        text: newComment.trim() 
      });
      setNewComment('');
      if (onRefresh) onRefresh();
    } catch (error) {
      const errorKey = getErrorKey(error)
      const errorMessage = t(errorKey);
      alert(t(errorMessage));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextArea 
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={t('wiki.comment_placeholder')}
        rows={3}
        disabled={isSubmitting}
      />
      <div className="flex justify-end mt-2">
        <Button 
          type="submit" 
          variant="primary" 
          loading={isSubmitting}
          disabled={isSubmitting || !newComment.trim()}
        >
          {isSubmitting ? t('common.sending') : t('common.send')}
        </Button>
      </div>
    </form>
  );
}

export default ParentCommentForm;


