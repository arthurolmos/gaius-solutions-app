import React, { Component, FunctionComponent } from 'react';
import styled from 'styled-components';

type ContainerProps = {
  title: string,
  children: React.ReactNode
}

export default function DefaultContainer({ title, children }: ContainerProps) {
  return (
    <Container>
      <Title>
        {title}
      </Title>

      {children}
    </Container>
  );
}

const Container = styled.div`
  margin-top: 100px;
  padding: 15px;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

const Title = styled.h2`
  text-transform: uppercase;
  margin: 0 0 15px 0;  
`;
