import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import cx from 'classnames';
import { CardBody } from './CardBody';
import { CardHeader } from './CardHeader';
import { CardFooter } from './CardFooter';

export type CardProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export type CardComponent = FC<CardProps> & {
  Body: typeof CardBody;
  Header: typeof CardHeader;
  Footer: typeof CardFooter;
};

export const Card: CardComponent = (props) => (
  <div {...props} className={cx('card esapp-card', props.className)} />
);

Card.Body = CardBody;
Card.Header = CardHeader;
Card.Footer = CardFooter;
