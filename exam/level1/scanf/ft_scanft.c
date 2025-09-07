#include <stdarg.h>
#include <stdio.h>
#include <ctype.h>

int match_space(FILE *f)
{
	int	c;

	while ((c = fgetc(f)) != EOF)
	{
		if (!isspace(c))
		{
			ungetc(c, f);
			break ;
		}
	}
	return (0);
}

int match_char(FILE *f, char c)
{
	int	ch = fgetc(f);

	if (ch == c)
		return (1);
	if (ch != EOF)
		ungetc(ch, f);
	return (0);
}

int scan_char(FILE *f, va_list ap)
{
	int	ch = fgetc(f);
	char *dst;

	if (ch == EOF)
		return (0);
	dst = va_arg(ap, char *);
	*dst = (char)ch;
	return (1);
}

int scan_int(FILE *f, va_list ap)
{
	int	c = fgetc(f);
	int	value = 0;
	int	sign = 1;

	if (c == '-' || c == '+')
	{
		if (c == '-')
			sign = -1;
		c = fgetc(f);
	}
	while (isdigit(c))
	{
		value = value * 10 + (c - '0');
		c = fgetc(f);
	}
	int	*dst = va_arg(ap, int *);
	*dst = value * sign;
	return 1;
}

int scan_string(FILE *f, va_list ap)
{
	char *dst = va_arg(ap, char *);
	int	c = fgetc(f);
	int	i = 0;

	if (c == EOF)
		return (0);
	dst[i++] = (char)c;

	while ((c = fgetc(f)) != EOF && !isspace(c))
		dst[i++] = (char)c;
	if (c != EOF)
		ungetc(c, f);
	dst[i] = '\0';
	return (1);
}


int	match_conv(FILE *f, const char **format, va_list ap)
{
	switch (**format)
	{
		case 'c':
			return scan_char(f, ap);
		case 'd':
			match_space(f);
			return scan_int(f, ap);
		case 's':
			match_space(f);
			return scan_string(f, ap);
		case EOF:
			return -1;
		default:
			return -1;
	}
}

int ft_vfscanf(FILE *f, const char *format, va_list ap)
{
	int nconv = 0;

	int c = fgetc(f);
	if (c == EOF)
		return EOF;
	ungetc(c, f);

	while (*format)
	{
		if (*format == '%')
		{
			format++;
			if (match_conv(f, &format, ap) != 1)
				break;
			else
				nconv++;
		}
		else if (isspace(*format))
		{
			if (match_space(f) == -1)
				break;
		}
		else if (match_char(f, *format) != 1)
			break;
		format++;
	}
	
	if (ferror(f))
		return EOF;
	return nconv;
}


int ft_scanf(const char *format, ...)
{
	int	ret;
	va_list ap;

	va_start(ap, format);
	ret = ft_vfscanf(stdin, format, ap);
	va_end(ap);
	return ret;
}

#include <stdio.h>

int main(void)
{
	int numero;
	char letra;
	char palavra[100];

	printf("Digite um número inteiro: ");
	if (ft_scanf("%d", &numero) != 1)
		return (printf("Erro ao ler número\n"), 1);

	printf("Digite um caractere: ");
	if (ft_scanf(" %c", &letra) != 1)
		return (printf("Erro ao ler caractere\n"), 1);

	printf("Digite uma palavra: ");
	if (ft_scanf("%s", palavra) != 1)
		return (printf("Erro ao ler palavra\n"), 1);

	printf("\n--- Resultado ---\n");
	printf("Número  : %d\n", numero);
	printf("Caractere: %c\n", letra);
	printf("Palavra : %s\n", palavra);

	return 0;
}
