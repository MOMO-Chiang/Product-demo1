import { FC, ReactNode } from 'react';
import { Card } from '../card';

export type SearchCardProps = {
  children?: ReactNode;
};

export const SearchCard: FC<SearchCardProps> = ({ children }) => (
  <Card className="esapp-search-card">
    <Card.Header>
      <h5>搜尋</h5>
    </Card.Header>
    <Card.Body className="esapp-search-card-body">{children}</Card.Body>
  </Card>
);
