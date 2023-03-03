% Find the smallest element of a list.

lt(A, B, C) :-
    A < B -> C = A ; C = B.

smallest([E], E).
smallest([H|T], S) :- 
    smallest(T, S1),
    % H < S1 -> S = H ; S = S1. ?????
    lt(H, S1, S).

% ?- smallest([23, 3, 2, 42], S).
% S = 2
