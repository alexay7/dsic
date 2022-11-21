import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePermisoDto {
  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  documentUrl: string;
}
