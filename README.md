# refactoring-2

> 컴퓨터가 이해하는 코드는 바보도 작성할 수 있다. 
> 사람이 이해하도록 작성하는 프로그래머가 진정한 실력자다.

## 리팩터링 시 테스트의 중요성

> 나는 리팩터링 시 테스트에 상당히 의지한다. 내가 저지른 실수로부터 보호해주는 버그 검출기 역할을 해주기 때문이다.

## 리팩터링 시 성능 문제

> 여기서 잠시 멈추고 반복문 쪼개기에 대해 생각해보자. 
> 무엇보다도 반복문을 쪼개서 성능이 느려지지 않을까 걱정할 수 있다. 
> 이처럼 반복문이 중복되는 것을 꺼리는 이들이 많지만, 이 정도 중복은 성능에 미치는 영향이 미미할 때가 많다.

> 때로는 리팩터링이 성능에 상당한 영향을 주기도 한다.
> 그런 경우라도 나는 개의치 않고 리팩터링 한다.

# IDE

## jetbrain products

* rename variable, function : `⇧ F6`