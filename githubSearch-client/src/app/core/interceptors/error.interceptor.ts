import { HttpInterceptorFn } from "@angular/common/http";
import { catchError, throwError } from "rxjs";

/**
 * Global Error Handling Interceptor.
 * * * Intercepts all HTTP responses and listens for errors.
 * * Logs the error details to the console for debugging.
 * * Re-throws the error using `throwError` so specific components 
 * can still react to it (e.g., showing a specific alert or toast).
 * * @param req - The outgoing HttpRequest.
 * @param next - The next HttpHandlerFn.
 * @returns An Observable that re-throws the error after logging.
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    return next(req).pipe(
        catchError((error) => {
            console.error(`Http Error: ${error}`)

            return throwError(() => error)
        })
    )
}