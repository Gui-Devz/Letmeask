import { ReactNode } from 'react';

import './styles.scss';

import {useTheme} from '../../hooks/useTheme'

type QuestionProps = {
  author: {
    avatar: string;
    name: string
  }
  content: string;
  children?: ReactNode;
  isAnswered?: boolean;
  isHighlighted?: boolean;
}

export function Question({
  content, 
  author,
  isAnswered = false,
  isHighlighted = false,
  children,
}: QuestionProps){
  const {theme} = useTheme();

  
  return (
    <div className={`theme-${theme} question ${isAnswered ? 'answered':''} ${isHighlighted ? 'highlighted': ''}`}>
      <p className={`theme-${theme}`}>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>
          {children}
        </div>
      </footer>
    </div>
  );
}