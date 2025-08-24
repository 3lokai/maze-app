# 5) State Machine (v1)

```
           +---------+
           |  Idle   |
           +----+----+
                |
                v
           +----+----+
           | Editing |  (Current Player builds queue)
           +----+----+
                |
             Run/Step
                v
           +----+----+
           |Executing|
           +----+----+
            |       |
   hitWall  |       | reachedGoal
            v       v
         +----+-----+----+
         | HitWall / Win |
         +----+-----+----+
                |
          Switch Turn
                v
              Idle
```

## Player Management States *(NEW)*

```
           +---------+
           | Single  |  (Default: 1 player)
           +----+----+
                |
         Add Player
                v
           +----+----+
           | Multi   |  (2-4 players)
           +----+----+
                |
         Remove Player
                v
           +---------+
           | Single  |
           +---------+
```

## Turn Management Logic

- **Single Player**: `currentPlayer` always Player 1
- **Multi Player**: Round-robin through `activePlayerIds`
- **Player Removal**: Automatically adjust turn order
- **Player Addition**: Insert into turn sequence

