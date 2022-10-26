export class BoardDto {
  title: string;
  content?: string;
}

export class BoardListDto extends BoardDto {
  user_name: string;
}

export class BoardChangeDto {
  board_id: string;
  title?: string;
  content?: string;
}
