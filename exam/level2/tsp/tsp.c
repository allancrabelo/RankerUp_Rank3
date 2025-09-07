#include <stdio.h>
#include <stdlib.h>
#include <math.h>

#define MAX 11

typedef struct {
    float x, y;
} City;

int n;
City cities[MAX];
float dist[MAX][MAX];
int used[MAX];
int path[MAX];
float best = -1.0;

float distance(City a, City b) {
    return sqrtf((a.x - b.x)*(a.x - b.x) + (a.y - b.y)*(a.y - b.y));
}

void search(int k, float length) {
    if (k == n) {
        // fecha o ciclo (volta pra cidade inicial)
        length += dist[path[n-1]][path[0]];
        if (best < 0 || length < best)
            best = length;
        return;
    }
    for (int i = 0; i < n; i++) {
        if (!used[i]) {
            used[i] = 1;
            path[k] = i;
            if (k > 0)
                search(k+1, length + dist[path[k-1]][i]);
            else
                search(k+1, 0.0); // primeira cidade não soma nada
            used[i] = 0;
        }
    }
}

int main(void) {
    // leitura
    n = 0;
    while (scanf("%f, %f", &cities[n].x, &cities[n].y) == 2)
        n++;

    // pré-calcula distâncias
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            dist[i][j] = distance(cities[i], cities[j]);

    // busca recursiva
    search(0, 0.0);

    // saída
    printf("%.2f\n", best);
    return 0;
}
