package pl.agawrysiuk.process;

import lombok.RequiredArgsConstructor;
import org.camunda.bpm.engine.RuntimeService;
import org.springframework.stereotype.Component;
import pl.agawrysiuk.camunda.dto.CamundaVariables;
import pl.agawrysiuk.utils.ConvertCamundaVariables;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class ProcessManager {

    private final RuntimeService runtimeService;

    public CamundaVariables startProcess(String processName) {
        CamundaVariables variables = new CamundaVariables();
        Map<String, Object> variablesMap = ConvertCamundaVariables.convertToMap(variables);
        runtimeService.startProcessInstanceByKey(processName, variablesMap);
        return variables;
    }
}
