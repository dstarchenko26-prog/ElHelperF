import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { getErrorKey } from "@/api/errorHandler";
import { commentService } from "@/api/comment";
import { useAuth } from "@/context/AuthContext";

import { Row, Text, TextArea, Button, ConfirmationModal } from '@/components/ui';

const CommentItem = ({ comment, onRefresh }) => {
  const { t } = useTranslation()
  const navigate = useNavigate();

  const { user } = useAuth();
  
  const [isReply, setIsReply] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openDeleteModal = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await commentService.deleteComment(comment.id);
      onRefresh();
    } catch (error) {
      const errorKey = getErrorKey(error)
      const errorMessage = t(errorKey);
      alert(t(errorMessage));
    }
  };

  const handleReply = async () => {
    if (!replyText.trim()) return;
    
    setIsSubmitting(true);
    try {
      await commentService.postComment({ 
        articleId: comment.articleId, 
        text: replyText, 
        parentId: comment.id 
      });
      setReplyText('');
      setIsReply(false);
      onRefresh();
    } catch (error) {
      const errorKey = getErrorKey(error)
      const errorMessage = t(errorKey);
      alert(t(errorMessage));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="border-l-2 border-t-2 !border-gray-200 !dark:border-gray-800 pl-4 pt-3 transition-all">
      <Row justify="between" align="center">
        <Text 
          variant="caption" 
          className="font-bold cursor-pointer !text-blue-600 hover:underline tracking-normal uppercase-none"
          onClick={() => navigate(`/profile/${comment.authorId}`)}
        >
          {comment.authorName}
        </Text>
        <Text variant="caption">
          {new Date(comment.createdAt).toLocaleString()}
        </Text>
      </Row>
      
      <Text className="my-2">
        {comment.text}
      </Text>

      {user && ( 
        <Row>
          <button 
            onClick={() => setIsReply(!isReply)} 
            className="text-[12px] font-semibold uppercase tracking-wider text-blue-500 hover:text-blue-700 transition-colors"
          >
            {isReply ? t('common.cancel') : t('wiki.reply')}
          </button>

          {user?.id === comment.authorId && (
            <button 
              onClick={openDeleteModal} 
              className="text-[12px] font-semibold uppercase tracking-wider text-red-400 hover:text-red-600 transition-colors"
            >
              {t('common.delete')}
            </button>
          )}
        </Row>
      )}

      {isReply && (
        <div className="my-3 space-y-2">
          <TextArea 
            value={replyText} 
            onChange={(e) => setReplyText(e.target.value)} 
            placeholder={`${t('wiki.reply_to')} ${comment.authorName}...`}
            rows={2} 
            autoFocus
          />
          <Row gap="sm">
            <Button size="sm" onClick={handleReply} loading={isSubmitting} disabled={!replyText.trim()}>
              {t('common.send')}
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setIsReply(false)}>
              {t('common.cancel')}
            </Button>
          </Row>
        </div>
      )}

      {comment.replies?.length > 0 && (
        <div className="mt-2 space-y-2">
          {comment.replies.map(reply => (
            <CommentItem key={reply.id} comment={reply} onRefresh={onRefresh} />
          ))}
        </div>
      )}

      <ConfirmationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title={t('wiki.conf_del_comment_t')}
        message={`${t('wiki.conf_del_comment_q1')} "? ${t('wiki.conf_del_comment_q2')}`}
        confirmText={t('common.y_del')}
        cancelText={t('common.n_save')}
        variant="danger"
      />

    </div>
  );
};

export default CommentItem;