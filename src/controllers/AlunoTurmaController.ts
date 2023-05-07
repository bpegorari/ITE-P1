import {Request, Response, response} from 'express'; 
import {PrismaClient} from '@prisma/client';

class AlunoTurma {    

    async list(req:Request,res:Response)
    {        
        
        const prisma = new PrismaClient();   
        await prisma.$connect(); 

        const turmaId = parseInt(req.params.id);

        const alunosTurma = await prisma.alunoTurma.findMany({
          where: {
            turmaId: turmaId,
          },
          select: {
            aluno: {
              select: {
                nome: true,
              },
            },
            chamada: {
              select: {
                presente: true,
              },
            },
            prova: {
              select: {
                nota: true,
              },
            },
            anotacoes: true,
          },
        });

      
        const resultado = alunosTurma.map((alunoTurma) => {
          const notas = alunoTurma.prova.map((prova) => prova.nota);
          const faltas = alunoTurma.chamada.filter((chamada) => !chamada.presente).length;
          const nome = alunoTurma.aluno.nome;
          const anotacoes = alunoTurma.anotacoes;
          console.log(anotacoes);
      
          return {
            nome,
            notas,
            faltas,
            anotacoes,
          };
        });

        console.log(resultado);
      
        res.json(resultado);
        return resultado;
    }

    async createNote(req:Request,res:Response)
    {        
        const prisma = new PrismaClient();   
        await prisma.$connect();

        const alunoId = parseInt(req.params.alunoId);
        const turmaId = parseInt(req.params.turmaId);
        const note = String(req.query.texto);
      
        try {
          const alunoTurma = await prisma.alunoTurma.findUnique({
            where: { turmaId_alunoId: { turmaId, alunoId } },
          });
      
          if (!alunoTurma) {
            return res.status(404).json({ error: 'Aluno não encontrado na turma especificada.' });
          }
      
          const updatedAlunoTurma = await prisma.alunoTurma.update({
            where: { id: alunoTurma.id },
            data: { anotacoes: note },
          });
      
          res.json(updatedAlunoTurma);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Ocorreu um erro ao adicionar a anotação ao aluno.' });
        }
    }

}

export default AlunoTurma