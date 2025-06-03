import pygame
from constants import *

def main():
    print("Starting Asteroids!")
    print(f"Screen width: {SCREEN_WIDTH}")
    print(f"Screen height: {SCREEN_HEIGHT}")

    numpass, numfail = pygame.init()
    print(f"{numpass} initialize modules | {numfail} failed")

    window_surface = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))

    while True:
        # input
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                print("noh vimo!")
                return
        # draw
        window_surface.fill("black")
        pygame.display.flip()


if __name__ == "__main__":
    main()
