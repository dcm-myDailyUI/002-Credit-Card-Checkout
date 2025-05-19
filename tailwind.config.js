tailwind.config = {
    theme: {
        extend: {
            animation: {
                'card-flip': 'flip 1s ease-in-out',
            },
            keyframes: {
                flip: {
                    '0%, 100%': { transform: 'rotateY(0deg)' },
                    '50%': { transform: 'rotateY(180deg)' },
                }
            }
        }
    }
}
