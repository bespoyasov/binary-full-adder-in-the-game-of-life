# Binary Adder in the Game of Life

Binary adder implementation in the Game of Life written in JavaScript using canvas.

The circuit in the app adds 2-but values. Under the hood, it uses binary half adder and binary full adder cicruit schemes. 

To add 2 numbers input them in the fields below. Each field accepts either "00", "01", "10", or "11" string. The circuit will calculate the sum and the carry for each bit.

Gliders are used as signals. To generate the glider flow we use Gosper glider gun with the period of 60. More about game of life, its patterns, and details of this circuit you can find in the post about circuit creation:

- 🇷🇺 [Пишем двоичный сумматор в игре «Жизнь»](https:/bespoyasov.ru/blog/binary-adder-in-game-of-life)
- 🇬🇧 [Let's Write a Binary Full Adder in the Game of Life](https://dev.to/bespoyasov/let-s-write-a-binary-adder-in-the-game-of-life-3of5)
