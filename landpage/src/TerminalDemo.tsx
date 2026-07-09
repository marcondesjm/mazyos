import { useState, useEffect, useRef } from 'react';
import './TerminalDemo.css';

interface Command {
  input: string;
  output: string;
  type: 'command' | 'output' | 'success' | 'error';
}

function TerminalDemo() {
  const [commands, setCommands] = useState<Command[]>([
    {
      input: '',
      output: 'MazyOS v1.0.0 - Sistema operacional do negócio',
      type: 'output'
    },
    {
      input: '',
      output: 'Digite /help para ver os comandos disponíveis',
      type: 'output'
    }
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  const helpCommands = [
    '/salvar - Salva o trabalho no GitHub',
    '/carrossel - Cria carrossel 1080×1350',
    '/publicar-tema - Publica blog + carrossel + legendas',
    '/seo - Executa fluxo completo de SEO',
    '/anuncio-google - Monta campanha Google Ads',
    '/relatorio-ads - Analisa performance de anúncios',
    '/analisar-dados - Gera insights de dados',
    '/email-profissional - Escreve emails profissionais'
  ];

  const commandOutputs: Record<string, string> = {
    '/salvar': '✅ Trabalho salvo no GitHub com sucesso!\n   Commit: a1b2c3d - "Atualização da landing page"\n   Branch: main\n   Arquivos: 12 alterados, 456 adicionados',
    '/carrossel': '🎨 Gerando carrossel para "Lançamento MazyOS"...\n   [████████████████████] 100% - Concluído!\n   ✅ Carrossel criado: carrossel-lancamento.png\n   📁 Pasta: /marketing/carrossel-lancamento/',
    '/publicar-tema': '📝 Publicando tema "Inteligência Artificial no Negócio"...\n   📝 Blog: "como-mazyos-transforma-empresas.md"\n   🎨 Carrossel: carrossel-ia-negocio.png\n   📱 Legendas: 3 legendas para Instagram\n   ✅ Publicação concluída!',
    '/seo': '🔍 Executando fluxo SEO completo...\n   1. Demanda: "MazyOS sistema operacional"\n   2. Concorrência: Análise de 25 sites\n   3. GMB: Otimização local\n   4. On-page: Meta tags e estrutura\n   5. Conteúdo: Artigos e landing pages\n   6. Ads: Campanhas otimizadas\n   7. Monitoramento: Relatórios semanais\n   8. GEO: Otimização para localização\n   ✅ SEO completo em 2 minutos!',
    '/anuncio-google': '📢 Criando campanha Google Ads...\n   Campanha: "MazyOS - Sistema Operacional"\n   Grupo de anúncios: 3 grupos criados\n   Palavras-chave: 45 palavras-chave relevantes\n   Anúncios: 6 variações de texto\n   ✅ Campanha exportada: campanha-mazyos.csv',
    '/relatorio-ads': '📊 Analisando campanhas de anúncios...\n   Google Ads: R$ 2.500 investidos, R$ 12.500 gerados\n   Meta Ads: R$ 1.800 investidos, R$ 8.200 gerados\n   ROI: 340% médio\n   Recomendações: Aumentar budget em 20%\n   ✅ Relatório salvo: relatorio-semanal.pdf',
    '/analisar-dados': '📈 Analisando dados do relatório mensal...\n   Receita: R$ 125.000 (+15% vs mês anterior)\n   Clientes: 89 novos clientes\n   Conversão: 3.2% taxa de conversão\n   Insights: Q4 teve melhor performance\n   ✅ Resumo executivo gerado',
    '/email-profissional': '✉️ Escrevendo email profissional...\n   Destinatário: parceiro@mazzeoia.com.br\n   Assunto: Proposta de parceria MazyOS\n   Tom: Profissional e colaborativo\n   ✅ Email salvo em: /saidas/email-parceria.txt'
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand(currentInput.trim());
    }
  };

  const executeCommand = (input: string) => {
    if (!input) return;

    // Add the command to the terminal
    const newCommand: Command = {
      input,
      output: '',
      type: 'command'
    };

    setCommands(prev => [...prev, newCommand]);
    setCurrentInput('');
    setIsTyping(true);

    // Simulate processing time
    setTimeout(() => {
      let output = '';
      let type: Command['type'] = 'output';

      if (input === '/help') {
        output = helpCommands.join('\n');
      } else if (input === '/clear') {
        setCommands([
          {
            input: '',
            output: 'MazyOS v1.0.0 - Sistema operacional do negócio',
            type: 'output'
          },
          {
            input: '',
            output: 'Digite /help para ver os comandos disponíveis',
            type: 'output'
          }
        ]);
        setIsTyping(false);
        return;
      } else if (commandOutputs[input]) {
        output = commandOutputs[input];
        type = 'success';
      } else {
        output = `Comando não reconhecido: ${input}\nDigite /help para ver os comandos disponíveis`;
        type = 'error';
      }

      setCommands(prev => {
        const updated = [...prev];
        const lastCommand = updated[updated.length - 1];
        if (lastCommand.input === input) {
          lastCommand.output = output;
          lastCommand.type = type;
        }
        return updated;
      });

      setIsTyping(false);
    }, 800);
  };

  // Auto-scroll to bottom when new commands are added
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commands]);

  return (
    <section id="terminal-demo" className="terminal-section">
      <div className="terminal-container">
        <h2 className="terminal-title">Experimente o MazyOS</h2>
        <p className="terminal-description">
          O sistema operacional do seu negócio com comandos simples e poderosos.
          Tente alguns comandos abaixo:
        </p>

        <div className="terminal-wrapper">
          <div className="terminal-header">
            <div className="terminal-dots">
              <div className="dot red"></div>
              <div className="dot yellow"></div>
              <div className="dot green"></div>
            </div>
            <div className="terminal-title-bar">MazyOS Terminal</div>
          </div>

          <div className="terminal-body" ref={terminalRef}>
            {commands.map((cmd, index) => (
              <div key={index} className="terminal-line">
                {cmd.input && (
                  <div className="terminal-command">
                    <span className="terminal-prompt">$</span>
                    <span className="terminal-input">{cmd.input}</span>
                  </div>
                )}
                {cmd.output && (
                  <div className={`terminal-output terminal-output-${cmd.type}`}>
                    {cmd.output.split('\n').map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="terminal-line">
                <div className="terminal-output terminal-output-output">
                  <span className="typing-indicator">Processando</span>
                  <span className="typing-dots">
                    <span className="dot">.</span>
                    <span className="dot">.</span>
                    <span className="dot">.</span>
                  </span>
                </div>
              </div>
            )}
            <div className="terminal-line">
              <div className="terminal-command">
                <span className="terminal-prompt">$</span>
                <input
                  type="text"
                  value={currentInput}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  className="terminal-input-field"
                  placeholder="Digite um comando..."
                  autoFocus
                />
              </div>
            </div>
          </div>
        </div>

        <div className="quick-commands">
          <p className="quick-commands-title">Comandos rápidos:</p>
          <div className="quick-commands-grid">
            {Object.keys(commandOutputs).slice(0, 4).map(cmd => (
              <button
                key={cmd}
                className="quick-command-button"
                onClick={() => executeCommand(cmd)}
              >
                {cmd}
              </button>
            ))}
            <button
              className="quick-command-button"
              onClick={() => executeCommand('/help')}
            >
              /help
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TerminalDemo;