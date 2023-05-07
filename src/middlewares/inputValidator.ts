import {Request,Response,NextFunction} from 'express'; 
// verifica se os parâmetros da requisição são válidos 
function InputValidator (req:Request,res:Response,next:NextFunction) {    
    const turmaId = req.params.id;
    const turmaIdNum = parseInt(turmaId, 10);

    if (isNaN(turmaIdNum)) {
      return res.status(400).json({ error: 'Turma ID deve ser um número.' });
    }
    // chama a próxima função na rota e retorna sua resposta    
    return next();
}
export default InputValidator