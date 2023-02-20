% Find all musicians who play the guitar.

musician_instrument('Marty Friedman', guitar).
musician_instrument('Flea', bass).
musician_instrument('John Frusciante', guitar).

musian_genre('Marty Friedman', 'metal').

musian_genre('John Frusciante', 'Funk rock').
musian_genre('John Frusciante', 'alternative rock').
musian_genre('John Frusciante', 'funk metal').

musian_genre('Flea', 'Funk rock').
musian_genre('Flea', 'alternative rock').
musian_genre('Flea', 'funk metal').

% ?- musician_instrument(Musician, guitar).
