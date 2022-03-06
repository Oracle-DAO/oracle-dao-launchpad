import styled from "@emotion/styled";

const P = styled.p`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 15px;
  letter-spacing: 1px;
  padding: 1rem;
  margin: 0;
`;

export function Footer() {
  return <P>&copy; Oracle Finance, All Rights Reserved</P>;
}
