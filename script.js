// Pool de questões Level 1
const level1Questions = [
	{
		title: "Filter",
		subject: "Assignment name: filter\nExpected files: filter.c\nAllowed functions: read, write, strlen, memmem, memmove, malloc, calloc, realloc, free, printf, fprintf, stdout, stderr, perror\n--------------------------------------------------------------------------------\n\nWrite a program that will take one and only one argument.\n\nYour program will then read from stdin and write all the content read in stdout\nexcept that every occurrence of s must be replaced by '' (as many as the length\nof s). Your program will be tested with random buffer sizes, using a custom read\nfunction. Therefore the buffer being set in your program will be filled with a\ndifferent number of chars each new call.\n\nFor example:\n\n./filter bonjour\nwill behave in the same way as:\nsed 's/bonjour/*/g'\n\n./filter abc\nwill behave in the same way as:\nsed's/abc//g'\n\nMore generally your program must be the equivalent of the shell script filter.sh\npresent in this directory (you can compare your program with it).\n\nIn case of error during a read or a malloc, you must write Error:  followed by NEW LINE the error message in stderr and return 1.\n\nIf the program is called without arguments or with an empty argument or with multiple\narguments, it must return 1.\n\nFor example this should work:\n\n$> echo 'abcdefaaaabcdeabcabcdabc' | ./filter abc | cat -e\n*defaaade*d*$\n$> echo 'ababcabababc' | ./filter ababc | cat -e\nab$\n$>\n\nNOTES:\nmemmem includes:\n #define _GNU_SOURCE\n #include <string.h>\n\nperror includes:\n #include <errno.h>\n\nread includes:\n #include <unistd.h>"
	},
	{
		title: "Scanf",
		subject: "Assignment name : ft_scanf\nExpected files : ft_scanf.c\nAllowed functions: fgetc, ungetc, ferror, feof, isspace, isdigit, stdin, va_start, va_arg, va_copy, va_end\n--------------------------------------------------------------------------------\n\nWrite a function named ft_scanf that will mimic the real scanf with the following constraints:\n\n- It will manage only the following conversions: s, d, and c\n- You don't have to handle the options *, m and '\n- You don't have to handle the maximum field width\n- You don't have to handle the types modifier characters (h, hh, l, etc.)\n- You don't have to handle the conversions beginning with %n$\n\nYour function must be declared as follows:\n\nint ft_scanf(const char *, ... );\n\nYou will find in this directory a file containing a part of the code you will need, you just have to complete it.\n\nTo test your program compare your results with the real scanf.\n\nHint : You may need to read the man of scanf.\n\n#include <stdarg.h>\n#include <stdio.h>\n#include <ctype.h>\n\nint match_space(FILE *f)\n{\n // You may insert code here\n return (0);\n}\n\nint match_char(FILE *f, char c)\n{\n // You may insert code here\n return (0);\n}\n\nint scan_char(FILE *f, va_list ap)\n{\n // You may insert code here\n return (0);\n}\n\nint scan_int(FILE *f, va_list ap)\n{\n // You may insert code here\n return (0);\n}\n\nint scan_string(FILE *f, va_list ap)\n{\n // You may insert code here\n return (0);\n}\n\n\nint\tmatch_conv(FILE *f, const char format, va_list ap)\n{\n\tswitch (format)\n\t{\n\t\tcase 'c':\n\t\t\treturn scan_char(f, ap);\n\t\tcase 'd':\n\t\t\tmatch_space(f);\n\t\t\treturn scan_int(f, ap);\n\t\tcase 's':\n\t\t\tmatch_space(f);\n\t\t\treturn scan_string(f, ap);\n\t\tcase EOF:\n\t\t\treturn -1;\n\t\tdefault:\n\t\t\treturn -1;\n\t}\n}\n\nint ft_vfscanf(FILE *f, const char *format, va_list ap)\n{\n\tint nconv = 0;\n\n\tint c = fgetc(f);\n\tif (c == EOF)\n\t\treturn EOF;\n\tungetc(c, f);\n\n\twhile (*format)\n\t{\n\t\tif (*format == '%')\n\t\t{\n\t\t\tformat++;\n\t\t\tif (match_conv(f, &format, ap) != 1)\n\t\t\t\tbreak;\n\t\t\telse\n\t\t\t\tnconv++;\n\t\t}\n\t\telse if (isspace(*format))\n\t\t{\n\t\t\tif (match_space(f) == -1)\n\t\t\t\tbreak;\n\t\t}\n\t\telse if (match_char(f, *format) != 1)\n\t\t\tbreak;\n\t\tformat++;\n\t}\n\t\n\tif (ferror(f))\n\t\treturn EOF;\n\treturn nconv;\n}\n\n\nint ft_scanf(const char *format, ...)\n{\n\t// ...\n\tint ret = ft_vfscanf(stdin, format, ap);\n\t// ...\n\treturn ret;\n}"
	},
	{
		title: "Broken Get_Next_Line",
		subject: "Assignment name : broken_gnl\nExpected files : broken_gnl.c\nAllowed functions: read, malloc, free\n--------------------------------------------------------------------------------\n\nWrite a function named get_next_line that will read one line from a file descriptor each time it is called, without memory leaks and with correct behavior. The function must use a static variable to store leftover data between calls.\n\nThe function must be declared as follows:\n\nchar get_next_line(int fd);\nYou will find in this directory a file containing a part of the code you will need, but it contains several bugs and memory leaks. You must repair it without changing the function signature.\n\nYour function must manage only the following constraints:\n\nIt must use a static buffer to store data between calls\n\nIt must work correctly for any positive value of BUFFER_SIZE (defined at compilation)\n\nIt must return the line read including the terminating '\n' character if present\n\nIt must return NULL when there is nothing more to read or an error occurs\n\nIt must not have any memory leaks\n\nYou don't have to handle:\n\nMultiple file descriptors simultaneously\n\nBinary files\n\nThe case where BUFFER_SIZE is undefined or negative\n\nTo test your program, compare your results with the expected behavior of reading lines from a file descriptor.\n\nHint: You may need to read the man of read and understand how static variables work.\n\n#include <broken_gnl.h>\n\nchar\tft_strchr(char *s, int c)\n{\n\tint\ti = 0;\n\twhile (s[i] && s[i] != c)\n\t\ti++;\n\tif (s[i] == c)\n\t\treturn (s + i);\n\telse\n\t\treturn (NULL);\n}\n\nvoid\t*ft_memcpy(void *dest, const void *src, size_t n)\n{\n\tsize_t i = 0;\n\twhile (i < n)\n\t{\n\t\t((char *)dest)[i] = ((char *)src)[i];\n\t\ti++;\n\t}\n\treturn (dest);\n}\n\nsize_t\tft_strlen(char *s)\n{\n\tsize_t\tret = 0;\n\twhile (*s)\n\t{\n\t\ts++;\n\t\tret++;\n\t}\n\treturn (ret);\n}\n\nint\tstr_append_mem(char **s1, char *s2, size_t size2)\n{\n\tsize_t\tsize1 = s1 ? ft_strlen(s1) : 0;\n\tchar\t*tmp = malloc(size2 + size1 + 1);\n\tif (!tmp)\n\t\treturn (0);\n\tif (*s1)\n\t\tft_memcpy(tmp, *s1, size1);\n\tft_memcpy(tmp + size1, s2, size2);\n\ttmp [size1 + size2] = 0;\n\tfree(*s1);\n\t*s1 = tmp;\n\treturn (1);\n}\n\nint\tstr_append_str(char **s1, char s2)\n{\n\treturn (str_append_mem(s1, s2, ft_strlen(s2)));\n}\n\nvoid\tft_memmove(void *dest, const void *src, size_t n)\n{\n\tif (dest < src)\n\t\treturn (ft_memcpy(dest, src, n));\n\telse if (dest == src)\n\t\treturn (dest);\n\tsize_t\ti = n;\n\twhile (i > 0)\n\t{\n\t\ti--;\n\t\t((char *)dest)[i] = ((char )src)[i];\n\t}\n\treturn (dest);\n}\n\nchar\tget_next_line(int fd)\n{\n\tstatic char\tb[BUFFER_SIZE + 1] = () ;\n\tchar\t*ret = NULL;\n\n\tchar\t*tmp = ft_strchr(b, '\n');\n\twhile (!tmp)\n\t{\n\t\tif (!str_append_str(&ret, b))\n\t\t\treturn (NULL);\n\t\tb[0] = '\0';\n\t\tint\tread_ret = read(fd, b, BUFFER_SIZE);\n\t\tif (read_ret == -1)\n\t\t\treturn (NULL);\n\t\tif (read_ret == 0)\n break;\n\t\tb[read_ret] = 0;\n\t\ttmp = ft_strchr(b, '\n');\n\t}\n\tif (tmp)\n\t{\n\t\tif (!str_append_mem(&ret, b, tmp - b + 1))\n\t\t{\n\t\t\tfree(ret);\n\t\t\treturn (NULL);\n\t\t}\n\t\tft_memmove(b, tmp + 1, ft_strlen(tmp + 1) + 1);\n\t}\n\telse\n\t{\n\t\tb[0] = '\0';\n\t\tif (!ret || !*ret)\n {\n free(ret);\n return (NULL);\n }\n\t}\n\treturn (ret);\n}"
	},
];

// Pool de questões Level 2
const level2Questions = [
	{
		title: "N Queens",
		subject: "Assignement name : n_queens\n\nExpected files : *.c *.h\n\nAllowed functions : atoi, fprintf, write, calloc, malloc, free, realloc, stdout, stderr\n\n-------------------------------------------------------------------------\n\nWrite a program that will print all the solutions to the n queens problem\nfor a n given as argument.\nWe will not test with negative values.\nThe order of the solutions is not important.\n\nYou will display the solutions under the following format :\n<p1> <p2> <p3> ... \n\nwhere pn are the line index of the queen in each colum starting from 0.\n\nFor example this should work :\n$> ./n_queens 2 | cat -e\n\n$> ./n_queens 4 | cat -e\n1 3 0 2$\n2 0 3 1$\n\n$> ./n_queens 7 | cat -e\n0 2 4 6 1 3 5$\n0 3 6 2 5 1 4$\netc..."
	},
	{
		title: "Permutations",
		subject: "Assignment name : permutations\nExpected files : *.c *.h\nAllowed functions: puts, malloc, calloc, realloc, free, write\n---------------------------------------------------------------\n\nWrite a program that will print all the permutations of a string given as argument.\n\nThe solutions must be given in alphabetical order.\n\nWe will not try your program with strings containing duplicates (eg: 'abccd').\n\nFor example this should work:\n\n$> ./permutations a | cat -e\na$\n\n$> ./permutations ab | cat -e\nab$\nba$\n\n$> ./permutations abc | cat -e\nabc$\nacb$\nbac$\nbca$\ncab$\ncba$"
	},
	{
		title: "Powerset",
		subject: "Assignment name : powerset\nExpected files : *.c *.h\nAllowed functions: atoi, printf, fprintf, malloc, calloc, realloc, free, stdout,\nwrite\n--------------------------------------------------------------------------------\n\nWrite a program that will take as argument an integer n followed by a set s of\ndistinct integers.\nYour program should display all the subsets of s whose sum of elements is n.\n\nThe order of the lines is not important, but the order of the elements in a subset is:\nit must match the order in the initial set s.\nThis way, you should not have any duplicates (eg: '1 2' and '2 1').\nFor example, using the command ./powerset 5 1 2 3 4 5\nthis output is valid:\n1 4\n2 3\n5\nthis one is also valid:\n2 3\n5\n1 4\nbut not this one:\n4 1\n3 2\n5\n\nIn case of a malloc error your program will exit with the code 1.\n\nWe will not test with invalid sets (for example '1 1 2').\n\nHint: the empty subset is a valid subset of any set. It will be displayed as an empty line.\n\nFor example this should work:\n$> ./powerset 3 1 0 2 4 5 3 | cat -e\n3$\n0 3$\n1 2$\n1 0 2$\n$> ./powerset 12 5 2 1 8 4 3 7 11 | cat -e\n8 4$\n1 11$\n1 4 7$\n1 8 3$\n2 3 7$\n5 7$\n5 4 3$\n5 2 1 4$\n$> ./powerset 0 1 -1 | cat -e\n$\n1 -1$\n$> ./powerset 7 3 8 2 | cat -e\n\n// Other tests:\n$> ./powerset 100 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 | cat -e\n...\n$> ./powerset -1 1 2 3 4 5 -10 | cat -e\n...\n$> ./powerset 0 -1 1 2 3 -2 | cat -e\n...\n$> ./powerset 13 65 23 3 4 6 7 1 2 | cat -e\n...\n$> ./powerset 10 0 1 2 3 4 5 6 7 8 9 | cat -e\n.."
	},
	{
		title: "Rip",
		subject: "Assignment name : rip\nExpected files : *.c *.h\nAllowed functions: puts, write\n--------------------------------------------------------------------------------\n\nWrite a program that will take as argument a string containing only parenthesis.\nif the parenthesis are unbalanced\nyour program shall remove the minimum number of parentheses for the expression to be balanced.\nBy removing we mean replacing by spaces.\nYou will then print all the solutions (can be more than one).\n\nThe order of the solutions is not important.\n\nFor example this should work:\n$> ./rip '(()' | cat -e\n ()$\n( )$\n$> ./rip '((()()())())' | cat -e\n((()()())())$\n$> ./rip '()())()'| cat -e\n()() ()$\n()( )()$\n( ())()$\n$> ./rip '(()(()(' | cat -e\n(() ) $\n( )( ) $\n( ) () $\n ()( ) $"
	},
	{
		title: "Tsp",
		subject: "Assignment name: tsp\nExpected files: *.c *.h\nAllowed functions: write, sqrtf, getline, fseek, fscanf, ferror, feof,\nfabsf, memcpy, fprintf, fclose, malloc, calloc, realloc, free, fopen,\nerrno, stderr, stdin, stdout\n-------------------------------------------------------\n\nThe first publication referring to this problem as the traveling salesman\nproblem is found in the 1949 RAND Corporation report by Julia Robinson,\nOn the Hamiltonian game (a traveling salesman problem).\n\nHere is how she defines the problem:\n\nThe purpose of this note is to give a method for solving a problem related\nto the traveling salesman problem. It seems worthwhile to give a description\nof the original problem. One formulation is to find the shortest route for a\nsalesman starting from Washington, visiting all the state capitals and then\nreturning to Washington.\n\nMore generally, to find the shortest CLOSED CURVE containing n given points\nin the plane.\n\nfor example with the following set of cities:\n0, 0\n1, 0\n2, 0\n0, 1\n1, 1\n2, 1\n1, 2\n2, 2\nwhich can be presented as follows:\n+ + +\n+ + +\n + +\nthe shortest path is:\n _\n| |\n ||\n\nso you should print the length of this path that is:\n8.00\n\nWrite a program that will read a set of city coordinates in the form \n'%f, %f\n' from the standard input and will print the length of the shortest\npossible path containing all these cities under the form '%.2f'.\n\nYour program will not be tested with more than 11 cities.\n\nYou will find in this directory a file tsp.c containing all the boring parts of\nthis exercise and example files to help you test your program.\n\nhint: in order to use sqrtf, add -lm at the end of your compilation command.\n\nFor example this should work:\n$> cat square.txt\n1, 1\n0, 1\n1, 0\n0, 0\n$> ./tsp < square.txt | cat -e\n4.00$"
	}
];

// Estado do jogo - SEMPRE inicia no Level 1
let gameState = {
	currentLevel: 1,
	currentQuestion: null,
	level1Stats: { correct: 0, total: 0 },
	level2Stats: { correct: 0, total: 0 }
};

// Texto para copiar (personalize conforme necessário)
const textToCopy = "Studying for Examrank 3 at 42 School - Systems Programming Challenge";

// Chart instance
let progressChart = null;
let labels = ['Session Start'];
let level1Data = [0];
let level2Data = [0];
let approvalData = [0];

// Inicialização - SEMPRE Level 1 após refresh
document.addEventListener('DOMContentLoaded', function() {
	createParticles();
	loadStats();
	loadChartData();
	gameState.currentLevel = 1; // FORÇA level 1 sempre
	loadRandomQuestion();
	updateUI();
	initChart();
});

// Criar partículas de fundo
function createParticles() {
	const container = document.getElementById('particles');
	const particleCount = 30;
	
	for (let i = 0; i < particleCount; i++) {
		const particle = document.createElement('div');
		particle.classList.add('particle');
		
		// Tamanho aleatório
		const size = Math.random() * 5 + 2;
		particle.style.width = `${size}px`;
		particle.style.height = `${size}px`;
		
		// Posição aleatória
		particle.style.left = `${Math.random() * 100}%`;
		particle.style.top = `${Math.random() * 100}%`;
		
		// Opacidade aleatória
		particle.style.opacity = Math.random() * 0.5 + 0.1;
		
		// Atraso de animação aleatório
		particle.style.animationDelay = `${Math.random() * 15}s`;
		
		// Duração de animação aleatória
		particle.style.animationDuration = `${Math.random() * 10 + 15}s`;
		
		container.appendChild(particle);
	}
}

// Carregar apenas estatísticas do localStorage
function loadStats() {
	const saved = localStorage.getItem('examrank3-stats');
	if (saved) {
		const stats = JSON.parse(saved);
		gameState.level1Stats = stats.level1Stats || { correct: 0, total: 0 };
		gameState.level2Stats = stats.level2Stats || { correct: 0, total: 0 };
	}
}

// Carregar dados do gráfico do localStorage
function loadChartData() {
	const savedChartData = localStorage.getItem('examrank3-chart-data');
	if (savedChartData) {
		const chartData = JSON.parse(savedChartData);
		labels = chartData.labels || ['Session Start'];
		level1Data = chartData.level1Data || [0];
		level2Data = chartData.level2Data || [0];
		approvalData = chartData.approvalData || [0];
	}
}

// Salvar apenas estatísticas
function saveStats() {
	const statsToSave = {
		level1Stats: gameState.level1Stats,
		level2Stats: gameState.level2Stats
	};
	localStorage.setItem('examrank3-stats', JSON.stringify(statsToSave));
}

// Salvar dados do gráfico no localStorage
function saveChartData() {
	const chartDataToSave = {
		labels: labels,
		level1Data: level1Data,
		level2Data: level2Data,
		approvalData: approvalData
	};
	localStorage.setItem('examrank3-chart-data', JSON.stringify(chartDataToSave));
}

// Carregar questão aleatória
function loadRandomQuestion() {
	let questions = gameState.currentLevel === 1 ? level1Questions : level2Questions;
	const randomIndex = Math.floor(Math.random() * questions.length);
	gameState.currentQuestion = questions[randomIndex];
	
	document.getElementById('question-title').textContent = gameState.currentQuestion.title;
	
	const levelElement = document.getElementById('current-level');
	levelElement.querySelector('span').textContent = `Level ${gameState.currentLevel}`;
	levelElement.className = `level-badge level-${gameState.currentLevel}`;
	
	// Reset botões
	const buttons = document.querySelectorAll('.action-btn');
	buttons.forEach(btn => {
		btn.disabled = false;
		btn.style.opacity = '1';
	});
}

// Marcar resposta
function markAnswer(isCorrect) {
	// Desabilitar botões durante feedback
	const buttons = document.querySelectorAll('.action-btn');
	buttons.forEach(btn => {
		btn.disabled = true;
		btn.style.opacity = '0.7';
	});
	
	if (gameState.currentLevel === 1) {
		gameState.level1Stats.total++;
		if (isCorrect) gameState.level1Stats.correct++;
	} else {
		gameState.level2Stats.total++;
		if (isCorrect) gameState.level2Stats.correct++;
	}
	
	// Feedback visual
	const feedback = isCorrect ? "Correct!" : "Try Again!";
	const type = isCorrect ? "success" : "error";
	showNotification(feedback, type);
	
	// Atualizar UI e salvar
	updateUI();
	saveStats();
	updateChart();
	
	// Nova questão após delay
	setTimeout(() => {
		// Implementar o fluxo correto:
		// - Se estiver no nível 1 e errar, continua no nível 1
		// - Se estiver no nível 1 e acertar, vai para o nível 2
		// - Se estiver no nível 2 (acertando ou errando), volta para o nível 1
		if (gameState.currentLevel === 1) {
			if (isCorrect) {
				gameState.currentLevel = 2; // Acertou no nível 1, sobe para nível 2
			}
			// Se errou, permanece no nível 1
		} else {
			gameState.currentLevel = 1; // No nível 2, sempre volta para nível 1
		}
		
		loadRandomQuestion();
		updateUI();
	}, 1500);
}

// Mostrar assunto
function showSubject() {
	const modal = document.getElementById('subject-modal');
	const content = document.getElementById('subject-content');
	
	content.textContent = gameState.currentQuestion.subject;
	
	// Formatar se contiver código
	if (gameState.currentQuestion.subject.includes('\n')) {
		content.innerHTML = '';
		const lines = gameState.currentQuestion.subject.split('\n');
		
		lines.forEach(line => {
			if (line.trim() === '') {
				content.appendChild(document.createElement('br'));
			} else if (line.trim().startsWith('-')) {
				const li = document.createElement('div');
				li.textContent = '• ' + line.substring(1);
				li.style.marginLeft = '20px';
				content.appendChild(li);
			} else if (line.includes(':')) {
				const parts = line.split(':');
				const strong = document.createElement('strong');
				strong.textContent = parts[0] + ':';
				content.appendChild(strong);
				if (parts[1]) {
					const span = document.createElement('span');
					span.textContent = parts[1];
					content.appendChild(span);
				}
				content.appendChild(document.createElement('br'));
			} else {
				const p = document.createElement('div');
				p.textContent = line;
				p.style.marginBottom = '10px';
				content.appendChild(p);
			}
		});
	}
	
	modal.style.display = 'block';
}

// Fechar modal
function closeModal() {
	document.getElementById('subject-modal').style.display = 'none';
}

// Copiar texto
function copyText() {
	navigator.clipboard.writeText(textToCopy).then(() => {
		showNotification("Text copied to clipboard!", "success");
	}).catch(err => {
		showNotification("Failed to copy text", "error");
	});
}

// Limpar progresso
function clearProgress() {
	if (confirm("Are you sure you want to clear all progress? This cannot be undone.")) {
		gameState.level1Stats = { correct: 0, total: 0 };
		gameState.level2Stats = { correct: 0, total: 0 };
		gameState.currentLevel = 1;
		
		localStorage.removeItem('examrank3-stats');
		localStorage.removeItem('examrank3-chart-data');
		
		labels = ['Session Start'];
		level1Data = [0];
		level2Data = [0];
		approvalData = [0];
		
		updateUI();
		initChart();
		loadRandomQuestion();
		
		showNotification("Progress cleared", "info");
	}
}

// Mostrar notificação
function showNotification(message, type) {
	const container = document.getElementById('notification-container');
	const notification = document.createElement('div');
	notification.className = `notification ${type}`;
	
	let icon = 'fa-info-circle';
	if (type === 'success') icon = 'fa-check-circle';
	if (type === 'error') icon = 'fa-exclamation-circle';
	
	notification.innerHTML = `
		<i class="fas ${icon}"></i>
		<span>${message}</span>
	`;
	
	container.appendChild(notification);
	
	// Remover após 3 segundos
	setTimeout(() => {
		notification.style.animation = 'slideInRight 0.3s ease reverse forwards';
		setTimeout(() => {
			container.removeChild(notification);
		}, 300);
	}, 3000);
}

// Atualizar UI
function updateUI() {
	// Atualizar estatísticas
	document.getElementById('level1-score').textContent = 
		`${gameState.level1Stats.correct}/${gameState.level1Stats.total}`;
	
	document.getElementById('level2-score').textContent = 
		`${gameState.level2Stats.correct}/${gameState.level2Stats.total}`;
	
	// Calcular pontuação total (média ponderada)
	const totalCorrect = gameState.level1Stats.correct + gameState.level2Stats.correct;
	const totalQuestions = gameState.level1Stats.total + gameState.level2Stats.total;
	const totalScore = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
	
	document.getElementById('total-score').textContent = `${totalScore}%`;
	
	// Atualizar badge de nível
	const levelElement = document.getElementById('current-level');
	levelElement.querySelector('span').textContent = `Level ${gameState.currentLevel}`;
	levelElement.className = `level-badge level-${gameState.currentLevel}`;
}

// Inicializar gráfico
function initChart() {
	const ctx = document.getElementById('progressChart').getContext('2d');
	
	if (progressChart) {
		progressChart.destroy();
	}
	
	progressChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: labels,
			datasets: [
				{
					label: 'Level 1',
					data: level1Data,
					borderColor: '#4facfe',
					backgroundColor: 'rgba(79, 172, 254, 0.1)',
					borderWidth: 3,
					tension: 0.3,
					fill: true,
					pointBackgroundColor: '#4facfe',
					pointBorderColor: '#fff',
					pointRadius: 5,
					pointHoverRadius: 7
				},
				{
					label: 'Level 2',
					data: level2Data,
					borderColor: '#ff6b6b',
					backgroundColor: 'rgba(255, 107, 107, 0.1)',
					borderWidth: 3,
					tension: 0.3,
					fill: true,
					pointBackgroundColor: '#ff6b6b',
					pointBorderColor: '#fff',
					pointRadius: 5,
					pointHoverRadius: 7
				},
				{
					label: 'Approval Probability',
					data: approvalData,
					borderColor: '#00ff9d',
					backgroundColor: 'rgba(0, 255, 157, 0.1)',
					borderWidth: 3,
					tension: 0.3,
					fill: true,
					pointBackgroundColor: '#00ff9d',
					pointBorderColor: '#fff',
					pointRadius: 5,
					pointHoverRadius: 7,
					borderDash: [5, 5]
				}
			]
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				legend: {
					display: true,
					position: 'top',
					labels: {
						color: 'rgba(255, 255, 255, 0.7)',
						font: {
							size: 12
						}
					}
				},
				tooltip: {
					mode: 'index',
					intersect: false,
					backgroundColor: 'rgba(30, 30, 40, 0.9)',
					titleColor: '#fff',
					bodyColor: '#fff',
					borderColor: 'rgba(255, 255, 255, 0.1)',
					borderWidth: 1,
					padding: 10,
					displayColors: true,
					callbacks: {
						label: function(context) {
							return `${context.dataset.label}: ${context.raw}%`;
						}
					}
				}
			},
			scales: {
				y: {
					beginAtZero: true,
					max: 100,
					grid: {
						color: 'rgba(255, 255, 255, 0.1)'
					},
					ticks: {
						color: 'rgba(255, 255, 255, 0.7)',
						callback: function(value) {
							return value + '%';
						}
					}
				},
				x: {
					grid: {
						color: 'rgba(255, 255, 255, 0.1)'
					},
					ticks: {
						color: 'rgba(255, 255, 255, 0.7)'
					}
				}
			},
			interaction: {
				mode: 'nearest',
				axis: 'x',
				intersect: false
			},
			animations: {
				tension: {
					duration: 1000,
					easing: 'linear'
				}
			}
		}
	});
}

// Atualizar gráfico
function updateChart() {
	const level1Score = gameState.level1Stats.total > 0 ? 
		Math.round((gameState.level1Stats.correct / gameState.level1Stats.total) * 100) : 0;
	
	const level2Score = gameState.level2Stats.total > 0 ? 
		Math.round((gameState.level2Stats.correct / gameState.level2Stats.total) * 100) : 0;
	
	// Calcular probabilidade de aprovação (média ponderada com mais peso para Level 2)
	const approvalProbability = (level1Score + (level2Score * 2)) / 3;
	
	// Adicionar novos dados
	const totalQuestions = gameState.level1Stats.total + gameState.level2Stats.total;
	labels.push(`Q${totalQuestions}`);
	level1Data.push(level1Score);
	level2Data.push(level2Score);
	approvalData.push(Math.round(approvalProbability));
	
	// Limitar a 10 pontos no gráfico
	if (labels.length > 10) {
		labels.shift();
		level1Data.shift();
		level2Data.shift();
		approvalData.shift();
	}
	
	// Atualizar gráfico
	progressChart.data.labels = labels;
	progressChart.data.datasets[0].data = level1Data;
	progressChart.data.datasets[1].data = level2Data;
	progressChart.data.datasets[2].data = approvalData;
	progressChart.update();
	
	// Salvar dados do gráfico
	saveChartData();
}

// Fechar modal clicando fora
window.onclick = function(event) {
	const modal = document.getElementById('subject-modal');
	if (event.target === modal) {
		closeModal();
	}
};