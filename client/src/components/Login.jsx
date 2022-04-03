import React from 'react';

export function Login(props) {
    return (
        <div>
            <h1>Login</h1>
            <form action="/login" method="POST">
                <section>
                    <label for="username">Username</label>
                    <input id="username" name="username" type="text" autocomplete="username" required autofocus />
                </section>
                <section>
                    <label for="current-password">Password</label>
                    <input id="current-password" name="password" type="password" autocomplete="current-password" required />
                </section>
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
}