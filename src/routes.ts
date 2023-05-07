// Importa componentes do express 
import {Router} from 'express'; 
// Importar ProdutoController
import AlunoTurmaController from './controllers/AlunoTurmaController'; 
// Validação dos parâmetos da rota 
import InputValidator from './middlewares/inputValidator';
// Instancia roteador 
const Roteador = Router(); 

Roteador.get('/turmas/:id/alunos', InputValidator, new AlunoTurmaController().list); 
Roteador.post('/turmas/:turmaId/alunos/:alunoId/anotacoes', new AlunoTurmaController().createNote); 

export default Roteador;