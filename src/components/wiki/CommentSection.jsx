import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { getErrorKey } from '@/api/errorHandler';
import { commentService } from '@/api/comment';
import { useAuth } from '@/context/AuthContext';

import CommentItem from "@/components/wiki/CommentItem";
import ParentCommentForm from "@/components/wiki/ParentCommentForm";

import {Card, Col, Heading, EmptyState, Button} from '@/components/ui';

import { LogIn } from 'lucide-react';

const CommentSection = ({ articleId }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { user } = useAuth();

  const [comments, setComments] = useState([]);

  const [loading, setLoading] = useState(true);

  const loadComments = useCallback(async () => {
    try {
      const data = await commentService.getComments(articleId);

      const sortedComments = data.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      setComments(sortedComments);
    } catch (error) {
      const errorKey = getErrorKey(error)
      const errorMessage = t(errorKey);
      alert(t(errorMessage));
    } finally {
      setLoading(false);
    }
  }, [articleId]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  return (
    <Card className="mt-6">
      <Col>
        <Heading variant="h3">
          {t('wiki.comments')} ({comments.length})
        </Heading>

        {user ? (
          <ParentCommentForm articleId={articleId} onRefresh={loadComments}/>
        ) : (
          <EmptyState 
            title={t('wiki.no_login')}
            description={t('wiki.no_login_desc')}
            icon={<LogIn/>}
            action={
              <Button
                variant='neutral'
                onClick={() => navigate('/auth')}
              >
                {t('common.login')}
              </Button>
            }
          />
        )}

        {comments.length > 0 ? (
          <Col gap="md">
            {comments.map(comment => (
              <CommentItem 
                key={comment.id} 
                comment={comment} 
                onRefresh={loadComments}
              />
            ))}
          </Col>
        ) : (
          !loading && (
            <EmptyState
              title={t('wiki.no_comments')}
            />
          )
        )}
      </Col>
    </Card>
  );
};

export default CommentSection;