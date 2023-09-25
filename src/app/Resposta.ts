export interface Resposta<T>{
    message?: string;
    data: T
}//criando interface para receber respostas sem precisar de fazer muitos codigos
//eu vou receber uma resposta com comentario, uma resposta com um momento