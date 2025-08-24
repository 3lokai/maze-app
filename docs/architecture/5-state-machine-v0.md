# 5) State Machine (v0)

```
           +---------+
           |  Idle   |
           +----+----+
                |
                v
           +----+----+
           | Editing |  (Player N builds queue)
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
