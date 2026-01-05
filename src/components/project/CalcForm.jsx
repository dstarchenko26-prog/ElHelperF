import Param from '@/components/project/Param';
import { Col } from '@/components/ui';

const CalcForm = ({ 
  formula, 
  inputs = {}, 
  inputUnits = {}, 
  results = {}, 
  stdResults = {},
  onInputChange, 
  onUnitChange, 
  lang 
}) => {

  if (!formula || !formula.parameters) return null;

  return (
    <div className="flex flex-col gap-6">
      <Col className="gap-3">
        {formula.parameters.map((param) => {
          const varName = param.var;
          const isResult = results?.[varName] !== undefined && inputs?.[varName] === undefined;
          const rawValue = inputs?.[varName] ?? results?.[varName] ?? '';
          const rawStdValue = stdResults?.[varName];

          return (
            <Param 
              key={varName} 
              param={param}
              rawValue={rawValue}       
              rawStdValue={rawStdValue} 
              unit={inputUnits?.[varName]}
              isResult={isResult} 
              onChange={(val) => onInputChange(varName, val)}
              onUnitChange={(u) => onUnitChange(varName, u)}
              lang={lang}
            />
          );
        })}
      </Col>      
    </div>
  );
}

export default CalcForm;