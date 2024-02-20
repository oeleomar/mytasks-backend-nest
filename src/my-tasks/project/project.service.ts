import { InjectRepository } from '@nestjs/typeorm';
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    !createProjectDto.due_date && (createProjectDto.due_date = new Date());
    !createProjectDto.status && (createProjectDto.status = 'pendente');
    !createProjectDto.priority && (createProjectDto.priority = 'media');

    try {
      console.log(createProjectDto);
      return await this.projectRepository.save(createProjectDto);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        'Erro ao criar projeto, tente novamente mais tarde',
      );
    }
  }

  async findAll(id: string) {
    if (!id) throw new UnauthorizedException('Usuário não encontrado');

    try {
      return await this.projectRepository.find({
        where: { user_id: id },
        relations: ['tasks', 'tags'],
      });
    } catch (err) {
      throw new InternalServerErrorException('Erro ao buscar projetos');
    }
  }

  async findOne(id: string) {
    if (!id) throw new UnauthorizedException('ID não enviado');

    try {
      return await this.projectRepository.findOneByOrFail({ id });
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        'Não foi possível buscar o projeto',
      );
    }
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    if (!id) throw new UnauthorizedException('ID não enviado');
    if (Object.keys(updateProjectDto).length === 0)
      throw new UnauthorizedException('Corpo não enviado');

    try {
      const project = await this.projectRepository.findOneByOrFail({ id });
      return await this.projectRepository.save({
        ...project,
        ...updateProjectDto,
        id: project.id,
        user_id: project.user_id,
      });
    } catch (err) {
      throw new InternalServerErrorException(
        'Erro ao atualizar projeto, não encontrado',
      );
    }
  }

  async remove(id: string) {
    if (!id) throw new UnauthorizedException('ID não enviado');

    try {
      const project = await this.projectRepository.findOneByOrFail({ id });
      return await this.projectRepository.remove(project);
    } catch (err) {
      throw new InternalServerErrorException(
        'Erro ao deletar projeto, não encontrado',
      );
    }
  }
}
