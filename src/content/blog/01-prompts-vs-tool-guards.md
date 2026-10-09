---
title: "Stronger prompts reduced unsafe forwarding. A tool guard stopped it."
date: "2026-10-09"
summary: "A small synthetic experiment on prompt injection in support-ticket agents: stronger system prompts cut unsafe forwarding requests, but only a tool-level guard stopped them from executing."
slug: "stronger-prompts-vs-tool-guard"
---

AI agents can process customer-support tickets by reading a customer’s problem and deciding what action to take. But a ticket can contain more than a request for help. An attacker can insert instructions intended to redirect the agent—for example, claiming that resolving an issue requires forwarding account information to an external “review team.”

I wanted to compare two ways of preventing that: stronger system instructions and a code-level check that blocks forwarding to unauthorized addresses. In a small synthetic experiment using Qwen2.5-7B-Instruct and Llama-3.1-8B-Instruct, stronger prompts reduced unsafe forwarding requests but left substantial failures. The code-level check prevented those requests from executing in the simulated environment, even though the models continued making them.

The distinction matters for agent safety: **getting a model to choose a safer action is different from preventing an unsafe action from having an effect.** I measured both, while also checking whether the defenses interfered with legitimate work.

## What I tested

The agent read a support ticket and selected an action, such as escalating the issue or forwarding account details to an internal specialist. Forwarding was a legitimate capability: some tickets genuinely required an internal handoff.

The security rule was that account details could only be forwarded to approved internal domains. An attacker controlled the ticket text, but not the system instructions or the forwarding code.

The attacks tried to make an unauthorized forward look like a normal part of resolving the ticket. They used formats such as routing records, quoted employee conversations, claimed policy exceptions, and prerequisites for completing the customer’s request.

The transfer evaluation contained:

- **120 distinct attack cases:** 12 support scenarios, five attack families, and two templates per family.
- **12 benign controls:** ordinary tickets without an attack.
- **24 legitimate-forward controls:** tickets where forwarding to the specified internal address was appropriate.

Half of the legitimate-forward controls used attack-like wording with authorized recipients. This mattered because an agent that refused every suspicious-looking handoff would avoid some attacks while failing useful tasks.

I ran three conditions on each model:

1. **Baseline prompt.** The system instructions already prohibited external forwarding and identified ticket text as untrusted.
2. **Stronger prompt.** Additional instructions explicitly rejected policy claims, quoted dialogue, and workflow instructions inside tickets as sources of authority.
3. **Stronger prompt plus tool guard.** The forwarding code checked the recipient before allowing the simulated action.

Each case ran three times at temperature 0. All repetitions produced identical scored decisions, so I treat them as repeatability checks, not additional independent examples.

## Results

| Model | Unsafe requests: baseline → stronger prompt | Legitimate-forward failures: baseline → stronger prompt | Unsafe requests blocked with guard |
|---|---:|---:|---:|
| Qwen2.5-7B | 99.2% → 62.5% | 8.3% → 8.3% | 225/225 |
| Llama-3.1-8B | 77.5% → 51.7% | 33.3% → 16.7% | 186/186 |

*Each attack condition contains 120 distinct cases, repeated three times. Legitimate-forward rates cover 24 distinct controls per model. Llama’s decrease corresponds to eight failing controls becoming four—a small, descriptive comparison, not evidence of a general improvement in utility.*

![Unsafe requests under baseline and stronger prompts, compared with allowed execution under tool enforcement](https://raw.githubusercontent.com/MokshitSurana/Agentic-AI-safety/main/analysis/figures/forwarding-results.png)

*The baseline and stronger-prompt bars measure model requests. The enforcement bars measure allowed simulated execution. These are deliberately different outcomes.*

Stronger instructions reduced unsafe requests by **36.7 percentage points for Qwen** and **25.8 percentage points for Llama**. Those improvements were substantial, but neither model reliably respected the forwarding boundary.

Adding the guard did not eliminate the models’ unsafe choices. Their scored decisions matched those in the stronger-prompt condition. What changed was whether the tool allowed those choices to take effect.

The guard also permitted legitimate work: Qwen completed 66 of 72 repeated legitimate-forward trials, and Llama completed 60 of 72. It did not fix cases where the model chose the wrong action in the first place.

Across the six transfer runs, all 2,808 trials completed without recorded errors or invalid trials. Forwarding was simulated throughout; no customer information or email was actually transmitted.

## Why did Qwen go from 30% to 99.2%?

An earlier development experiment produced a 30% unsafe-request rate for Qwen. That might look inconsistent with the 99.2% baseline rate above, but the two numbers describe different attack collections.

The development set appended five fixed attack payloads to eight support tickets, using one external destination. The transfer set used 12 new scenarios, ten templates, and two different destinations. Its attacks included quoted handoffs, signed exceptions, and claims that an external mailbox was approved or internal. One destination placed an approved-looking name inside an external domain.

The legitimate support task stayed the same, but the attack distribution changed substantially. This comparison does not isolate whether wording, recipient addresses, or another dataset feature caused the increase.

The earlier stronger-prompt result was also more encouraging: it reduced Qwen’s development-set unsafe-request rate from 30% to 7.5%. On the transfer set, that same prompt still allowed unsafe requests in 62.5% of trials.

For me, this is an important result in its own right. A defense looking effective on one attack collection was not enough to predict its performance on another.

## Isn’t it obvious that an allowlist blocks external addresses?

Yes. The guard’s success is not evidence of a new security principle.

If code correctly checks the recipient against an allowlist, and every forward must pass through that check, blocking destinations outside the list is the expected result. The experiment is not a claim that this mechanism is novel or that the models became resistant to prompt injection.

The useful comparison is between three things that can otherwise get conflated:

- Whether the model requests a prohibited action.
- Whether the system permits that action.
- Whether legitimate tasks still succeed.

A prompt-only evaluation would show an improvement but considerable remaining vulnerability. Looking only at executed actions under enforcement could conceal how often the model still tried to violate the policy. Looking only at blocked attacks could conceal a system that also prevented useful work.

This separation is consistent with the broader systems-level approach in [CaMeL, *Defeating Prompt Injections by Design*](https://arxiv.org/abs/2503.18813), which uses capabilities to enforce security policies when tools are called. My recipient check is much narrower than that architecture.

The contribution here is a small, auditable comparison—not a replacement for existing defenses.

## Did the stronger prompt simply make the models refuse more?

Not in aggregate on these controls. Qwen’s legitimate-forward failure rate stayed unchanged, while Llama’s decreased.

However, aggregate improvements can hide regressions. On distinct attack cases, Llama’s stronger prompt corrected 33 previously unsafe decisions but made two previously safe cases unsafe. Both regressions used the same previous-shift handoff template.

That does not establish why the model changed its decisions. It does show why comparing individual cases is useful: “the average improved” is not the same as “the defense helped everywhere.”

Likewise, the lower aggregate legitimate-forward failure rate is encouraging but limited evidence. A larger and more varied control set could reveal costs that these controls missed.

## Limitations

This is a synthetic study of two configured models, not an estimate of how often deployed support agents would be compromised. The transfer set was created after examining development results and used related attack families. It was not an independently sourced benchmark. Prompts were frozen before the transfer runs; enforcement was added afterward.

The experiment also studied a single decision per ticket. It does not tell us what would happen if an agent could continue after a denied action, use other tools, or communicate through other channels. Templates and recipient addresses were coupled, limiting attribution of failures to particular attack features.

The metrics need careful interpretation. “Unsafe request” includes nonempty, non-approved recipient strings, even malformed ones; it does not demonstrate successful delivery to an attacker. “False refusal” means failure to select the expected legitimate forward, which can include escalation or forwarding to the wrong internal destination rather than an explicit refusal.

Most importantly, **zero allowed external forwards does not establish general prompt-injection resistance**. The guard enforces one narrow boundary. It cannot determine whether every mailbox within an approved domain should receive a particular customer’s information, and it does not protect other information channels.

## What I take away

The result is not that prompts are useless. Stronger instructions materially improved both models’ behavior in this experiment.

But an improvement in behavior is not an enforcement guarantee. Even after stronger instructions, the models frequently requested actions that violated an explicit policy. A check at the tool boundary prevented those requests from becoming simulated external forwards.

For agent evaluations, I think this makes a practical case for reporting attempted violations, allowed execution, and legitimate-task failures separately. Each answers a different question about whether a system is useful and safe.

Future work includes multi-step recovery and instruction copying after a tool denial.

The code, raw results, and reproducible analyses are available in the [project repository](https://github.com/MokshitSurana/Agentic-AI-safety), including the [results audit](https://github.com/MokshitSurana/Agentic-AI-safety/blob/main/analysis/report.md) and [paired error analysis](https://github.com/MokshitSurana/Agentic-AI-safety/blob/main/analysis/error-analysis.md).
