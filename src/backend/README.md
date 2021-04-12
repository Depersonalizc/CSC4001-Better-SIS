##后端目录
大家可以在这里写后端代码

### course.py
- Initial commit
    - 写了一半还需改善
    - 定义了session和course 两个类，course包含一门课的所有信息，包括lec/tut两种session，lec的ssssion有两个课时
    - 定义了检测课时冲突的函数，paras: session1, session2

- 2021.4.13 (Jamie)
    - Switch to `set` to represent instructors for faster conflict checking
    - Add `TimeOfWeek` and `TimeSlot` (wrapper classes of `datetime`) to represent time slots of sessions
    - Rewrite session adding and conflict checking
    - Merge `showSession()` and likes to `Session.__repr__()`
    - Add more detailed comments
    - TODO:
        - `Course.delte_session(session_no)`
        - a `ShoppingCart` class
        - a 'smart' `Scheduler` class (maybe later)