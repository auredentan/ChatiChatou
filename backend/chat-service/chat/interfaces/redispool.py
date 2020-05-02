from abc import abstractmethod


class RedisPool:
    @abstractmethod
    def get_pool():
        raise NotImplementedError()


REDISPOOL: RedisPool
