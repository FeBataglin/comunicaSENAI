import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders} from '@angular/common/http';

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {

    // Interceptor utilizado para desfazer a alteração na requisição do arquivo de tradução    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // Verifica se a requisição possui a palavra "assets"
        // Caso possua, trata-se de uma requisição interna, no caso, do arquivo de tradução        // 
        const index = req.url.indexOf('assets');
        
        if (index >= 0) {
            // Caso possua, é excluido a URL do Mingle incorporada pelo MingleInterceptor
            // e também o header da requisição também incorporado pelo Mingle
            let headersNewReq = new HttpHeaders();

            const newReq = req.clone({
                url: req.url.substring(index),
                headers: headersNewReq
            });

            // Depois de voltar a requisição para o estado inicial, executa a mesma 
            return next.handle(newReq);            
        }
        
        // Caso não tenha o assets, trata-se de uma requisição que será utilizada com
        // Mingle. Apenas executa a requisição
        return next.handle(req);
    }
};