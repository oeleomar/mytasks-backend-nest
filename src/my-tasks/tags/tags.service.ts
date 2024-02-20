import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TagsService {
  constructor(@InjectRepository(Tag) private tagRepository: Repository<Tag>) {}

  async create(createTagDto: CreateTagDto) {
    if (!createTagDto.user_id)
      throw new NotFoundException('Usuário não informado.');

    try {
      const tag = await this.tagRepository.create(createTagDto);
      return this.tagRepository.save(tag);
    } catch (err) {
      console.log(err);
      throw new NotFoundException('Erro ao criar a tag.');
    }
  }

  async findAll(userId) {
    if (!userId) throw new NotFoundException('Usuário não informado.');

    try {
      const tags = await this.tagRepository.find({
        where: { user_id: userId },
      });
      return tags;
    } catch (err) {
      throw new NotFoundException(
        'Nenhuma tag encontrada para o usuário informado.',
      );
    }
  }

  findOne(id: string) {
    if (!id) throw new NotFoundException('Tag não informada.');

    try {
      const tag = this.tagRepository.findOneOrFail({
        where: { id },
      });
      return tag;
    } catch (err) {
      throw new NotFoundException('Tag não encontrada.');
    }
  }

  update(id: string, updateTagDto: UpdateTagDto) {
    if (!id) throw new NotFoundException('Tag não informada.');

    try {
      return this.tagRepository.update({ id }, updateTagDto);
    } catch (err) {
      throw new NotFoundException('Tag não encontrada.');
    }
  }

  async remove(id: string) {
    if (!id) throw new NotFoundException('Tag não informada.');

    try {
      const tag = await this.tagRepository.findOneByOrFail({ id });

      return await this.tagRepository.remove(tag, { transaction: false });
    } catch (err) {
      console.log(err);
      throw new NotFoundException('Tag não encontrada.');
    }
  }
}
