# refactoring-2

> 컴퓨터가 이해하는 코드는 바보도 작성할 수 있다. 
> 사람이 이해하도록 작성하는 프로그래머가 진정한 실력자다.

> 간결함이 지혜의 정수일지 몰라도,
> 프로그래밍에서만큼은 명료함이 진화할 수 있는 소프트웨어의 정수다.

> 좋은 코드를 가늠하는 확실한 방법은 '얼마나 수정하기 쉬운가' 다. 

> 리팩터링은 성능 최적화와 비슷하다.
> 둘 다 코드를 변경하지만 프로그램의 전반적인 기능은 그대로 유지한다.
> 단지 목적이 다를 뿐이다.
> 리팩터링의 목적은 코드를 이해하고 수정하기 쉽게 만드는 것이다.
> 프로그램의 성능은 좋아질 수도, 나빠질 수도 있다.
> 반면 성능 최적화는 오로지 속도 개선에만 신경 쓴다.
> 그래서 목표 성능에 반드시 도달해야 한다면 코드는 다루기에 더 어렵게 바뀔 수도 있음을 각오해야 한다.

## 리팩터링 시 테스트의 중요성

> 나는 리팩터링 시 테스트에 상당히 의지한다. 내가 저지른 실수로부터 보호해주는 버그 검출기 역할을 해주기 때문이다.

## 리팩터링 시 성능 문제

> 여기서 잠시 멈추고 반복문 쪼개기에 대해 생각해보자. 
> 무엇보다도 반복문을 쪼개서 성능이 느려지지 않을까 걱정할 수 있다. 
> 이처럼 반복문이 중복되는 것을 꺼리는 이들이 많지만, 이 정도 중복은 성능에 미치는 영향이 미미할 때가 많다.

> 때로는 리팩터링이 성능에 상당한 영향을 주기도 한다.
> 그런 경우라도 나는 개의치 않고 리팩터링 한다.
> 잘 다듬어진 코드라야 성능 개선 작업도 훨씬 수월하기 때문이다.

> 따라서 리팩터링으로 인한 성능 문제에 대한 내 조언은 '특별한 경우가 아니라면 일단 무시하라' 라는 것이다.

# IDE

## jetbrain products

* rename variable, function : `⇧ F6`