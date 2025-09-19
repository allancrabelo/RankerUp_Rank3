#include <stdio.h>

void	print_solutions(char *str, int index, int open, int close, int removed, int min_remove, char *buffer)
{
	if (str[index] == '\0')
	{
		if (open == close && removed == min_remove)
		{
			buffer[index] = '\0';
			puts(buffer);
		}
		return ;
	}

	char c = str[index];

	if (c == '(' || c == ')')
	{
		buffer[index] = c;
		if (c == '(')
			print_solutions(str, index + 1, open + 1, close, removed, min_remove, buffer);
		else if (open > close)
			print_solutions(str, index + 1, open, close + 1, removed, min_remove, buffer);
	}
	else
	{
		buffer[index] = c;
		print_solutions(str, index + 1, open, close, removed, min_remove, buffer);
	}
	if (c == '(' || c == ')')
	{
		buffer[index] = ' ';
		print_solutions(str, index + 1, open, close, removed + 1, min_remove, buffer);
	}
}

int	count(char *str)
{
	int open = 0;
	int close = 0;
	int	i = -1;

	while (str[++i])
	{
		if (str[i] == '(')
			open++;
		else if (str[i] == ')')
		{
			if (open > 0)
				open--;
			else
				close++;
		}
	}
	return (open + close);
}

int	main(int ac, char *av[])
{
	if (ac != 2)
		return (1);
	char *str = av[1];
	int	min_remove = count(str);
	char buffer[256];
	print_solutions(str, 0, 0, 0, 0, min_remove, buffer);
	return (0);
}

/*
Note: Do NOT check if argv is empty. The program must handle an empty string
argument correctly. For example:

$> ./a.out "" | cat -e
$> $ -> expected output
*/
