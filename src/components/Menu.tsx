import { User, Car } from "phosphor-react";

import {
  ContentContainer,
  MenuContainer,
  NavbarLink,
  NavLinkContainer,
} from "./Menu.styles";

export function Menu() {
  return (
    <MenuContainer>
      <ContentContainer>
        <Car size={52} color="#56CCF2"/>
        <NavLinkContainer>
          <NavbarLink to="/users">
            <User size={32} />
          </NavbarLink>
        </NavLinkContainer>
      </ContentContainer>
    </MenuContainer>
  );
}