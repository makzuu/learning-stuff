% Reserve the elements of a list.

reverse([], List).
reverse([Head|Tail], List) :- reverse(Tail, [Head|List]).

% ?- reverse([3, 2, 1], X).
% X = [1, 2, 3]
