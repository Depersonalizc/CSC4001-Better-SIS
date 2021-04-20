from typing import Iterable


def iter_to_str(iter: Iterable, sep: str = ', '):
    return sep.join(item.__str__() for item in iter)
