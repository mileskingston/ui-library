import PropTypes from 'prop-types';
import React from 'react';
import styled, { css } from 'styled-components';

import { IconStyled as Icon } from '../Icon/Icon';

const Wrapper = styled.ul`
  font-size: 13px;
  border-radius: 4px;
  
  ${({
    theme: { dcColorGs5, dcColorGs7, spacing1 }
  }) => css`
    background-color: ${dcColorGs7};
    border: solid 1px ${dcColorGs5};
    padding: 0 ${spacing1};
  `};
`;

const Item = styled.li`
  border-bottom: 1px solid #d8d8d8;
  list-style: none;
  margin: 0;
  
  &:last-child {
    border-bottom: none;
  };
`;

const Link = styled.a`
  ${({
    theme: {
      dcColorGs0,
      dcColorGs2,
      dcColorLink,
      spacing1,
      spacing2
    }
  }) => css`
    display: flex;
    color: ${dcColorLink};
    text-decoration: none;
    padding: ${spacing2} ${spacing1};
    
    &:hover {
      text-decoration: underline;
    }
    
    ${Icon} {
      display: block;
      color: ${dcColorGs2};
      margin-right: ${spacing1};
      text-align: center;
      
      svg {
        height: 15px;
      }
    }
  `};
`;

const ListMenu = props => (
  <Wrapper {...props}>
    {props.items.map((item, index) => props.children(item, index, Item, Link))}
  </Wrapper>
);

ListMenu.displayName = 'ListMenu';

ListMenu.propTypes = {
  /**
   * Item renderer.
   *
   * @param {mixed} item
   * @param {number} index
   * @param {Item} ItemWrapper
   * @param {Link} LinkWrapper
   * @return {React.Node}
   */
  children: PropTypes.func,
  items: PropTypes.arrayOf(PropTypes.any).isRequired
};

ListMenu.defaultProps = {
  children: (item, index, ItemWrapper, LinkWrapper) => (
    <ItemWrapper key={index}>
      <LinkWrapper
        href={item.href || '#'}
        onClick={item.onClick}
        data-interaction={item.interaction}
      >
        <Icon icon={item.icon} />{item.label}
      </LinkWrapper>
    </ItemWrapper>
  )
};

export default ListMenu;
