import { ReactNode } from 'react';

import './styles.scss';

type QuestionProps = {
  author: {
    avatar: string;
    name: string
  }
  content: string;
  children?: ReactNode;
}

export function Question({content, author,children}: QuestionProps){
  
  return (
    <div className="question">
      <p>{content}</p>
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