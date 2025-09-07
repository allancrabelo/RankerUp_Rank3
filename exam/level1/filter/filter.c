#include <unistd.h>
#include <stdio.h>
#include <string.h>
#ifndef BUFFER_SIZE
# define BUFFER_SIZE 10
#endif

void	ft_filter(char *line, char *str)
{
	int	len = strlen(str);
	int	i = 0;
	while (line[i])
	{
		int	h = 0;
		while (str[h] && line[i + h] == str[h])
			h++;
		if (h == len)
		{
			int	l = 0;
			while (l < len)
			{
				write (1, "*", 1);
				l++;
			}
			i += h;
		}
		else
		{
			write (1, &line[i], 1);
			i++;
		}
	}
}

int	main(int argc, char **argv)
{
	char	line[999999];
	int		ret = 1;
	int		i = 0;
	if (argc != 2 || !argv[1][0])
		return (1);
	while (ret > 0)
	{
		ret = read(0, &line[i], BUFFER_SIZE);
		if (ret < 0)
		{
			perror("Error");
			return (1);
		}
		i += ret;
	}
	ft_filter(line, argv[1]);
	return (0);
}