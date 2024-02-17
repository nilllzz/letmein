export class Email {
	subject;
	from;
	body;
	location = "";
	isRead = false;
}

export const emailServer = reactive();
