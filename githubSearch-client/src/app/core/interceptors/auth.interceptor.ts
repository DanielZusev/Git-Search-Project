import { HttpInterceptorFn } from "@angular/common/http";

/**
 * Functional HTTP Interceptor that injects the JWT authentication token.
 *
 * * Checks `localStorage` for a key named `'jwt_token'`.
 * * If a token is found, it clones the request and attaches the
 * `Authorization: Bearer <token>` header.
 * * If no token is found, passes the original request to the next handler.
 *
 * @param req - The outgoing HttpRequest.
 * @param next - The next HttpHandlerFn in the interceptor chain.
 * @returns An Observable of the HttpEvent.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const token = localStorage.getItem("jwt_token")

    if (token) {
        const clonedRequest = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        })

        return next(clonedRequest)
    }

    return next(req)
}