-- QBCore = nil

QBCore = nil

local QBCore = exports['qb-core']:GetCoreObject()



local function toggleNuiFrame(shouldShow)
  SetNuiFocus(shouldShow, shouldShow)

  SendReactMessage('setVisible', shouldShow)
end


RegisterCommand('bossmenu', function()
  QBCore.Functions.TriggerCallback('getBusinessData' , function(data)
    SendReactMessage('displayBossMenu', data)
    toggleNuiFrame(true)
  end)


end)

RegisterNUICallback('getData' , function(data , cb)
  QBCore.Functions.TriggerCallback('getBusinessData' , function(returndata)
    cb(returndata)
  end , data)
end)


RegisterNUICallback('employeeAction' , function(data , cb)
  QBCore.Functions.TriggerCallback('employeeActionServer' , function(returndata)
    QBCore.Functions.TriggerCallback('getBusinessData' , function(data)
      SendReactMessage('displayBossMenu', data)
    end)
  end , data)
end)


RegisterNUICallback('postAction' , function(data)
  if(json.decode(data).info[1].action == 'deposit') then
    TriggerServerEvent('qb-bossmenu:server:depositMoney', json.decode(data).info[1].amount)
  else
    TriggerServerEvent('qb-bossmenu:server:withdrawMoney', tonumber(json.decode(data).info[1].amount))
  end
  TriggerServerEvent('bossmenu:addLog', json.decode(data).info[1].action , json.decode(data).info[1].note , json.decode(data).info[1].amount)
end)

RegisterNetEvent('qb-bossmenu:client:OpenMenu', function()
  QBCore.Functions.TriggerCallback('getBusinessData' , function(data)
    SendReactMessage('displayBossMenu', data)
  end)
end)

RegisterNUICallback('updateData' , function(data , cb)
  QBCore.Functions.TriggerCallback('updateBusinessData' , function(returndata)
    if(returndata) then
      QBCore.Functions.TriggerCallback('getBusinessData' , function(data)
        SendReactMessage('displayBossMenu', data)
      end)
    end
    cb('ok')
  end , data)
end)

RegisterNUICallback('hideFrame', function(_, cb)
  toggleNuiFrame(false)
  debugPrint('Hide NUI frame')
  cb({})
end)

