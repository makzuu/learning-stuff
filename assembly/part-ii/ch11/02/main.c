#include <stdio.h>
#include <stdint.h>
#include <assert.h>

#define NUMS_SIZE 3

int64_t largest(int64_t *, int64_t);
int64_t exponent(int64_t base, int64_t exponent);

void print_a(int64_t *, size_t);
int main(void) {
	int64_t nums[NUMS_SIZE] = {13, 2, 69};

	int64_t result = largest(nums, NUMS_SIZE);
	assert(result == 2);
	print_a(nums, NUMS_SIZE);
	printf("largest number(index): %ld\n", result);


	printf("---\n");

	int64_t b = 2;
	int64_t e = 2;

	result = exponent(b, e);
	assert(result == 4);
	printf("%ld ^ %ld: %ld\n", b, e, result);

	return 0;
}

void print_a(int64_t *a, size_t size) {
	printf("[");
	for (size_t i = 0; i < size; i++) {
		printf("%ld", a[i]);
		if (i + 1 != size) {
			printf(", ");
		}
	}
	printf("]\n");
}
