package me.articket.server.login.data;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

public class UserDetailAuthenticationToken extends AbstractAuthenticationToken {

    private final UserDetail details;

    public UserDetailAuthenticationToken(UserDetail details, Collection<? extends GrantedAuthority> authorities) {
        super(authorities);
        this.details = details;
        super.setAuthenticated(true);
    }

    @Override
    public Collection<GrantedAuthority> getAuthorities() {
        return super.getAuthorities();
    }

    @Override
    public Object getCredentials() {
        return null;
    }

    @Override
    public UserDetail getDetails() {
        return details;
    }

    @Override
    public UserDetail getPrincipal() {
        return details;
    }

    @Override
    public boolean isAuthenticated() {
        return super.isAuthenticated();
    }

    @Override
    public void setAuthenticated(boolean isAuthenticated) throws IllegalArgumentException {
        super.setAuthenticated(isAuthenticated);
    }

    @Override
    public String getName() {
        return details.getNickname();
    }
}


