#include <unistd.h>

void	ft_swap(char *a, char *b)
{
	char tmp = *a;
	*a = *b;
	*b = tmp;
}

void	ft_putstr(char *str)
{
	while (*str)
		write(1, str++, 1);
	write(1, "\n", 1);
}

int	ft_strlen(char *str)
{
	int i = 0;
	while (str[i])
		i++;
	return (i);
}

void	ft_sort(char *str, int len)
{
	int i = 0;
	while (i < len - 1)
	{
		int j = 0;
		while (j < len - i - 1)
		{
			if (str[j] > str[j + 1])
				ft_swap(&str[j], &str[j + 1]);
			j++;
		}
		i++;
	}
}

int	ft_next_permutation(char *str, int len)
{
	int i = len - 2;
	while (i >= 0 && str[i] >= str[i + 1])
		i--;
	if (i < 0)
		return 0;
	int j = len - 1;
	while (str[j] <= str[i])
		j--;
	ft_swap(&str[i], &str[j]);
	int start = i + 1;
	int end = len - 1;
	while (start < end)
		ft_swap(&str[start++], &str[end--]);
	return 1;
}

int	main(int argc, char **argv)
{
	if (argc != 2)
		return 1;
	char *str = argv[1];
	int len = ft_strlen(str);
	ft_sort(str, len);
	ft_putstr(str);
	while (ft_next_permutation(str, len))
		ft_putstr(str);
	return 0;
}